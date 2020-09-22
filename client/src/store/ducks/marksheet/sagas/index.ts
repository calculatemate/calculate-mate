import watchGetStart from './get';
import watchSaveStart from './save';
import watchDeleteStart from './delete';

export default [watchGetStart(), watchSaveStart(), watchDeleteStart()];
