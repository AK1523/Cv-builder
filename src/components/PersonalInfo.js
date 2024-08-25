import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Box } from '@mui/material';

const PersonalInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Box>
      <TextField
        fullWidth
        label="Name"
        {...register('personalInfo.name', { required: 'Name is required' })}
        error={!!errors.personalInfo?.name}
        helperText={errors.personalInfo?.name?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register('personalInfo.email', { 
          required: 'Email is required',
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: 'Email is not valid'
          }
        })}
        error={!!errors.personalInfo?.email}
        helperText={errors.personalInfo?.email?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Phone"
        type="tel"
        {...register('personalInfo.phone', { 
          required: 'Phone number is required',
          minLength: {
            value: 10,
            message: 'Phone number must be at least 10 digits'
          }
        })}
        error={!!errors.personalInfo?.phone}
        helperText={errors.personalInfo?.phone?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Address"
        {...register('personalInfo.address')}
        margin="normal"
      />
    </Box>
  );
};

export default PersonalInfo;
