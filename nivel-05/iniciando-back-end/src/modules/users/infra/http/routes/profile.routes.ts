import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      password_confirmation: Joi.string()
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.optional(),
        })
        .valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
