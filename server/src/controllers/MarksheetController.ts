import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { forEach, flatten, filter, map, sumBy, find } from 'lodash';
import { validate } from 'class-validator';

import { MarksheetItem } from '../entity/MarksheetItem';
import { Marksheet } from '../entity/Marksheet';
import logger from '../logger';

class MarksheetController {
  static listAll = async (req: Request, res: Response) => {
    const { userId } = req.query;
    // Get marksheets from database
    const marksheetRepository = getRepository(Marksheet);
    const marksheetItemsRepository = getRepository(MarksheetItem);

    const marksheets = await marksheetRepository.find({
      select: ['id', 'name', 'updatedAt'],
      where: {
        userId,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
    const ids = map(marksheets, item => item.id.toString());
    const names = map(marksheets, item => item.name);
    const updatesAt = map(marksheets, item => item.updatedAt);
    const marksheetsItems = await marksheetItemsRepository.find({
      select: ['id', 'value', 'percent', 'name', 'marksheetId'],
    });

    const mks = map(ids, (id, i) => {
      const list = filter(marksheetsItems, item => item.marksheetId === id);
      return {
        id,
        list,
        name: names[i],
        average: sumBy(list, item => {
          return item.value * (item.percent / 100);
        }).toFixed(3),
        updatedAt: updatesAt[i],
      };
    });
    // Send the marksheets object
    res.send(mks);
  };

  static newMarksheet = async (req: Request, res: Response) => {
    logger.info('Get parameters from the body');
    const { rows, userId, name } = req.body;
    if (rows.length > 20 || rows.length === 0) res.status(409).send('Invalid rows amount ');

    const marksheetToSave = new Marksheet();
    marksheetToSave.userId = userId;
    marksheetToSave.name = name;
    let savedMarksheet;
    try {
      const marksheetRepository = getRepository(Marksheet);
      savedMarksheet = await marksheetRepository.save(marksheetToSave);
    } catch (e) {
      res.status(409).send('error creating marksheet');
      return;
    }

    const marksheet = [];
    const promises = [];

    forEach(rows, item => {
      const rowItem = new MarksheetItem();
      rowItem.name = item.name;
      rowItem.percent = Number(item.percent);
      rowItem.value = Number(item.value);
      rowItem.marksheetId = savedMarksheet.id.toString();
      marksheet.push(rowItem);
      promises.push(validate(rowItem));
    });

    logger.info('Validate if the parameters are ok');
    const errors = await Promise.all(promises);
    logger.info(`Validate if the parameters are ok => ${JSON.stringify(errors)}`);
    if (flatten(errors).length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Try to save
    const marksheetItemsRepository = getRepository(MarksheetItem);
    try {
      const marksheetPromises = [];
      forEach(marksheet, item => {
        marksheetPromises.push(marksheetItemsRepository.save(item));
      });
      await Promise.all(marksheetPromises);
    } catch (e) {
      res.status(409).send('error creating marksheet');
      return;
    }

    // If all ok, send 201 response
    res.status(201).send('Marksheet created');
  };

  static deleteMarksheetItem = async (req: Request, res: Response) => {
    // Get the ID from the url
    const { id } = req.params;

    const marksheetRepository = getRepository(Marksheet);
    try {
      await marksheetRepository.findOneOrFail(id);
      await marksheetRepository.delete(id);
    } catch (error) {
      res.status(404).send('MarksheetItemnot found');
      return;
    }

    // After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static editMarksheet = async (req: Request, res: Response) => {
    // Get the ID from the url
    const { id } = req.params;

    // Get values from the body
    const { name, rows } = req.body;

    // Try to find marksheet on database
    const marksheetRepository = getRepository(Marksheet);
    let marksheet;
    try {
      marksheet = await marksheetRepository.findOneOrFail(id);
    } catch (error) {
      // If not found, send a 404 response
      res.status(404).send('User not found');
      return;
    }

    // Validate the new values on model
    marksheet.name = name;
    const promises = [];
    const marksheetItemsRepository = getRepository(MarksheetItem);
    const items = [];
    const search = await marksheetItemsRepository.find({ where: { marksheetId: marksheet.id.toString() } });

    forEach(search, item => {
      const newItem = find(rows, r => r.id === item.id.toString());
      item.name = newItem.name;
      item.value = Number(newItem.value);
      item.percent = Number(newItem.percent);
      items.push(marksheetItemsRepository.save(item));
      promises.push(validate(item));
    });
    const newOnes = filter(rows, r => !r.id);
    forEach(newOnes, n => {
      const newItem = new MarksheetItem();
      newItem.name = n.name;
      newItem.percent = Number(n.percent);
      newItem.value = Number(n.value);
      newItem.marksheetId = marksheet.id.toString();
      items.push(marksheetItemsRepository.save(newItem));
      promises.push(validate(newItem));
    });
    logger.info('Validate if the parameters are ok');
    const errors = await Promise.all(promises);
    logger.info(`Validate if the parameters are ok => ${JSON.stringify(errors)}`);
    if (flatten(errors).length > 0) {
      res.status(400).send(errors);
      return;
    }

    // Try to save

    try {
      await marksheetRepository.save(marksheet);
      await Promise.all(items);
    } catch (e) {
      res.status(409).send('fail editing marsheet');
      return;
    }
    // After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default MarksheetController;
