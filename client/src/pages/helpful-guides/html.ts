const html = `
  <style>
   p, h1, h2, h3, h4 {
   color: black;
   }
   p {
   font-weight: normal;
   margin: 2rem 0;
   }
   th {
   border: 1px solid black;
   text-align: center;
   padding: 0 20px ;
   }
</style>
<h3 style="text-align: center"><strong>What is CalculateMate?</strong></h3>
<h6 style="text-align: center">15 August 2020 – 10 Minute Read</h6>
<p>CalculateMate is a grade calculator website, designed for fast and easy calculations for college or university.</p>
<p>
   Get started by entering your marks and credits for each of your courses or modules. Then, if you wish to sav your calculations to view at a later use, simply sign up for an account with us at CalculateMate so that you can create a new mark sheet. You may create a total of 10 different mark sheets!  
</p>
<p>
   You do NOT have to create an account with us to use our grade calculator! CalculateMate is free to use for anybody who needs some help figuring out their total module scores.  
</p>
<p>
   Creating an account is optional and only to be used if you wish to save your marks.  
</p>
<p>
   Each college and university calculates their degree classification differently, so we chose to offer an easy way to calculate weighted averages without having to know much about each university’s marking policy.  
</p>
<p>Please consult with your college or university directly if you have specific questions regarding their own marking schemes and policies.</p>
<h3 style="text-align: center"><strong>How are averages calculated?</strong></h3>
<p>The average score obtained for a module is calculated with a weighted sum over all the elements.</p>
<p>For example, consider the following results.</p>
<table>
   <thead>
      <tr>
         <th>
            Assignment
         </th>
         <th>
            Grade
         </th>
         <th>
            Weight (%)
         </th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <th>Exam</th>
         <th>73</th>
         <th>20</th>
      </tr>
      <tr>
         <th>Coursework</th>
         <th>67</th>
         <th>80</th>
      </tr>
   </tbody>
</table>
<p>Total grade = (73*0.2) + (67 *0.8) = 68.2%</p>
<p>You would multiply your grade by the weight associated with it. After that’s done, you would then add each multiplication altogether to receive your total score.</p>
<p>Note: The weight (percent) must be converted into decimals first.</p>
<h3 style="text-align: center"><strong>How to find your degree classification</strong></h3>
<p>Most universities use similar terminology for categorizing your final degree classification. Once you have calculated your weighted average, you can find you degree classification within the following ranges:</p>
<ul>
   <li>
      <p>60%-69%: Second Class Honours, Upped Division ("2.1")</p>
   </li>
   <li>
      <p>50%-59%: Second Class Honours, Lower Division ("2.2")</p>
   </li>
   <li>
      <p>40%-49%: Third Class Honours ("3rd")</p>
   </li>
   <li>
      <p>30%-39%: Pass (without honours)</p>
   </li>
   <li>
      <p>29%-0%: Fail</p>
   </li>
</ul>
<p>For Undergraduate degrees, First class honours can also be referred to as a distinction. In the UK, 20% of undergraduates get a 1st, 51% get a 2.1, and 24% get a 2.2</p>
<p>When it comes to postgraduate master’s degrees, they have fewer ranges:</p>
<ul>
   <li>
      <p>100%-70%: Distinction</p>
   </li>
   <li>
      <p>60%-69%: Merit</p>
   </li>
   <li>
      <p>0%-49%: Fail</p>
   </li>
</ul>
`;

export default html;
