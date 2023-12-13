import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/students/customers-table';
import { CustomersSearch } from 'src/sections/students/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';

const now = new Date();

// const data = [
//   {
//     id: '5e887ac47eed253091be10cb',
//     address: {
//       city: 'Cleveland',
//       country: 'USA',
//       state: 'Ohio',
//       street: '2849 Fulton Street'
//     },
//     avatar: '/assets/avatars/avatar-carson-darrin.png',
//     createdAt: subDays(subHours(now, 7), 1).getTime(),
//     email: 'carson.darrin@devias.io',
//     name: 'Carson Darrin',
//     phone: '304-428-3097'
//   },
// ]

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const getChat = async (id) => {
  let result = {};
  const res = await fetch("http://localhost:8000/student-chat?id=" + id);
  await res.json().then((res) => {
    console.log(res);
    const conversations = res;
    // const sortedConvos = conversations.sort((a, b) => a[0].localeCompare(b[0]));
  
    conversations.forEach(([key, value]) => {
      console.log(key, value);
      result = key.split('\n')
    });
    console.log(result);
  });
  return result;
}
const Page = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const customers = useCustomers(page, rowsPerPage);

  const [data, setData] = useState([]);
  const [chatMode, setChatMode] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [chat, setChat] = useState([]);
  // const customersIds = useCustomerIds(data);
  // const customersSelection = useSelection(customersIds);

  useEffect(() => {
    fetch("http://localhost:8000/student-list")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let newdata = [];
        res.map((val, ind) => (
          newdata.push({
            id: ind,
            name: val,
          })
        ))
        setData(newdata);
      });
    }
    , []);


//   const getStudents = async () => {
//     const res = await fetch("/student-list");
//     setData(await res.json());
//     // console.log(data);
//     // setData(data);
//   }

//   const handlePageChange = useCallback(
//     (event, value) => {
//       setPage(value);
//     },
//     []
//   );

//   const handleRowsPerPageChange = useCallback(
//     (event) => {
//       setRowsPerPage(event.target.value);
//     },
//     []
//   );

  return (
    <>
      <Head>
        <title>
          Students | Stellar Insights
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Students
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* {data.map((student) => (
                <p >{student.name} {student.id}</p>
            ))} */}

            
            {/* <CustomersSearch /> */}
            {/* <CustomersTable
              count={data.length}
              items={data}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            /> */}

            <Scrollbar>
              {!chatMode ? 
                    <Box sx={{ minWidth: 800 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {/* <TableCell padding="checkbox"> */}
                              {/* <Checkbox
                                checked={selectedAll}
                                indeterminate={selectedSome}
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    onSelectAll?.();
                                  } else {
                                    onDeselectAll?.();
                                  }
                                }}
                              /> */}
                            {/* </TableCell> */}
                            <TableCell>
                              Name
                            </TableCell>
                            <TableCell>
                              Chat
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data.map((student) => {
                            // const isSelected = customersSelection.selected.includes(student.id);
                            // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                            return (
                              <TableRow
                                hover
                                key={student.id}
                                // selected={isSelected}
                              >
                                {/* <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isSelected}
                                    onChange={(event) => {
                                      if (event.target.checked) {
                                        onSelectOne?.(student.id);
                                      } else {
                                        onDeselectOne?.(student.id);
                                      }
                                    }}
                                  />
                                </TableCell> */}
                                <TableCell>
                                  <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                  >
                                    <Avatar>
                                      {student.name}
                                    </Avatar>
                                    <Typography variant="subtitle2">
                                      {student.name}
                                    </Typography>
                                  </Stack>

                                </TableCell>
                                <TableCell>
                                  {/* {createdAt} */}
                                  <Button startIcon={(
                                      <SvgIcon fontSize="small">
                                        <PlusIcon />
                                      </SvgIcon>
                                    )}
                                    variant="contained"
                                    onClick={async ()=>{
                                      getChat(student.id)
                                      .then((res)=>{
                                        console.log(res);
                                        setChat(res);
                                        setStudentName(student.name);
                                        setChatMode(true);
                                      })}}>
                                      View Chat
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Box>
              :  <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                    <Button startIcon={(<SvgIcon fontSize="small">
                                <ArrowLeftIcon /></SvgIcon>
                            )}
                            variant="contained"
                            onClick={()=>{
                                setChatMode(false);
                              }}>
                              Go Back
                          </Button>
                          <Typography variant="h4">
                      {studentName}
                        </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chat.map((message, ind) => {
                    return (
                      <TableRow
                        hover
                        key={ind}
                        // selected={isSelected}
                      >
                        <TableCell style={{ backgroundColor: ind%2==1 ? "white" : "lightblue" }}>
                            <Typography variant="subtitle2">
                              {message}
                            </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>} 
                  </Scrollbar>
            
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
