import multer from 'multer';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import upload from '@config/upload';
import OrganizationController from '../controller/OrganizationController';
import authentication from '@shared/infra/http/middlewares/authentication';
import organizationUser from '@shared/infra/http/middlewares/organizationUser';

const router = Router();

const organizationController = new OrganizationController();
const uploadMiddleware = multer(upload.multer);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      organization: Joi.object()
        .keys({
          name: Joi.string().required(),
          phone: Joi.string().empty(),
          description: Joi.string().empty(),
        })
        .required(),
      address: Joi.object()
        .keys({
          street: Joi.string().empty(),
          streetNumber: Joi.string().empty(),
          neighborhood: Joi.string().empty(),
          city: Joi.string().empty(),
          state: Joi.string().empty(),
          zipCode: Joi.string().empty(),
          extra: Joi.string().empty(),
        })
        .empty(),
    },
  }),
  organizationController.store,
);

router.patch(
  '/logo',
  authentication,
  organizationUser,
  uploadMiddleware.single('file'),
  organizationController.logoUpload,
);

router.get('/:id', authentication, organizationController.index);

export default router;
