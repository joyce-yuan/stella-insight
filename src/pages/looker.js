import Head from 'next/head';
import NextLink from 'next/link';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import Iframe from 'react-iframe'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => (
    <>
      <Head>
        <title>
          Looker | Stellar Insights
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Looker
              </Typography>
            </div>
            <div>
            <Iframe width="80%" height="700" 
            url="https://lookerstudio.google.com/embed/reporting/18cf6d71-3714-4cad-9232-42ce39299c54/page/Mu1hD" 
            frameborder="0" 
            style="border:0" allowfullscreen
            display="block"></Iframe>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
  
  Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;
