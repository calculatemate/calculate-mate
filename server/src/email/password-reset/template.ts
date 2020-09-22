export default (link: string): string => `
<!DOCTYPE html>
<html>
<body>
<div style="padding: 25px">
<h1>Hey Mate! </h1> <br />
<h2>Here is your link</h2><br />
<a href="${link}">Reset your password</a><br />
<p>Or past in your browser</p><p>${link}</p>
</div>
</body>
</html>
`;
