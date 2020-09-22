import watchLoginStart from './login';
import watchLogoutStart from './logout';
import watchRegisterStart from './register';

export default [watchLoginStart(), watchLogoutStart(), watchRegisterStart()];
