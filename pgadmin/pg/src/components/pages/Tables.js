import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Breadcrumbs, Button, Grid, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import { Host } from '../reducers/loader/Host';
import postgres from '../images/postgres.png'
import { deleteTables, getColumn, getTables } from '../reducers/loader/Tables';

export default function DatabaseTable() {

    // const address = useSelector(state => state.HostReducer?.address)
    const tables = useSelector(state => state?.TablesReducer?.tables)
    const header = useSelector(state => state?.TablesReducer?.header)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        try {
            dispatch(getTables({ navigate }, { dispatch }))
        } catch (e) {
            console.error(e)
        }
    }, [navigate, dispatch])

    return (
        <Grid
            container
        >
            <Grid
                xs={12}
                py={2}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        <Button disabled>
                            <Typography color={'GrayText'}>
                                Database
                            </Typography>
                        </Button>
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={postgres}

                            sx={{ width: 36, height: 36 }}
                        />
                    </Link>
                    <Typography color="text.primary">
                        <Button>
                            <Typography
                                color={'GrayText'}
                                sx={{
                                    textDecorationLine: 'underline'
                                }}
                            >
                                Tables
                            </Typography>
                        </Button>
                    </Typography>
                </Breadcrumbs>
                <Button
                    variant='outlined'
                    startIcon={<AddCircleOutlineIcon />}
                >
                    Table
                </Button>
            </Grid>
            <Grid
                xs={12}
                md={4}
            >
                <TableContainer component={Paper} sx={{ py: 3 }}>
                    {
                        tables.length > 0 ?
                            <Table sx={{ textAlign: 'center' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            Object.keys(header).map((item, id) => {
                                                return (
                                                    <TableCell key={id} sx={{
                                                        textAlign: 'center'
                                                    }}>
                                                        <Button
                                                            onClick={() => dispatch(getColumn({ name: item, navigate }, { dispatch }))}
                                                        >
                                                            {item}
                                                        </Button>
                                                    </TableCell>
                                                )
                                            })
                                        }
                                        <TableCell sx={{
                                            textAlign: 'center'
                                        }}>
                                            <Button>
                                                Options
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tables.map((row, id) => (
                                        <TableRow
                                            key={id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" sx={{
                                                textAlign: 'center'
                                            }}>
                                                <Button>
                                                    <Typography
                                                        color={'grey'}
                                                        fontSize={'13px'}
                                                    >
                                                        {row.table_name}
                                                    </Typography>
                                                </Button>
                                            </TableCell>
                                            <TableCell sx={{
                                                textAlign: 'center'
                                            }}>
                                                <Button onClick={() => dispatch(deleteTables({ name: row.table_name, navigate }, { dispatch }))} >
                                                    <DeleteOutlineIcon />
                                                </Button>
                                                <Button>
                                                    <AddCircleOutlineIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            :
                            <Button>No Tables Found !</Button>
                    }
                </TableContainer>
            </Grid>
            <Grid
                xs={12}
                md={8}
            >

            </Grid>
        </Grid>
    );
}