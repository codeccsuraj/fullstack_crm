import * as Yup from 'yup';

export const createUserSchemaValidation = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string(),
    dob: Yup.date().required('DOB is required'),
    gender: Yup.string().required('Gender is required'),
    maritalStatus: Yup.string().required('Marital status is required'),
    bio: Yup.string(),
    shortDescription: Yup.string()
});