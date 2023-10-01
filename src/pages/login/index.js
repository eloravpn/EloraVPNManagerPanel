import Card from '../../components/card';
import { Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import HttpService from '../../components/httpService';
import Http from '../../components/httpService/Http';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import TextFieldWrapper from '../../components/formik/textfield';
import { dataForm } from '../../utils';
import { useLocalStorage } from 'hooks/useLocalStorage';
import Button from 'components/button';

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [, setAppData] = useLocalStorage('appData', '', -1);
  const handleSubmit = (values) => {
    setIsLoading(true);
    HttpService()
      .post('/admin/token', dataForm({ ...values, grant_type: 'password' }), {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        setAppData({ token: res.data.access_token, user: { name: 'No Name' } });

        navigate('/');
      })
      .catch((err) => {
        Http.error(err);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="login">
      <Grid
        className=""
        container
        direction="column"
        sx={{
          minHeight: '98vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Grid item sx={{ display: 'flex', width: 'auto' }} className="fade-in">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <Card className="glass ">
                  <Stack spacing={2} justifyContent="center">
                    <Typography variant="h4" component={'h4'} sx={{ margin: 3, p: 2 }}>
                      Sign In
                    </Typography>
                    <TextFieldWrapper name="username" label="Username" />
                    <TextFieldWrapper type={'password'} name="password" label="Password" />
                    <Button type={'submit'} loading={isLoading}>
                      Login
                    </Button>
                  </Stack>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
