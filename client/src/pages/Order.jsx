import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loader from '../components/Loader';
import {
  useGetOrderQuery,
  useRemoveOrderMutation,
} from '../redux/features/orderApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const Order = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { data, isLoading } = useGetOrderQuery();
  const [removeOrder] = useRemoveOrderMutation();

  React.useEffect(() => {
    if (!auth?.token) {
      navigate('/');
    }
  }, [auth?.token]);

  if (isLoading) {
    return <Loader />;
  }

  const handleRemoveOrder = async (productId) => {
    await removeOrder(productId);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: '4rem',
      }}
    >
      <Box
        px={{
          lg: '10rem',
          md: '4rem',
        }}
        py="2rem"
      >
        {data?.orders.length === 0 || data === undefined ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '550px',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                textTransform: 'uppercase',
                fontWeight: '500',
                color: 'gray',
              }}
            >
              No Order.
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.orders.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '10px',
                          marginLeft: '10px',
                        }}
                      >
                        <Box
                          sx={{
                            width: '70px',
                            height: '70px',
                          }}
                        >
                          <img
                            src={item.colorImg}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            {item.title}
                          </Typography>
                          <Typography sx={{ fontSize: '.8rem' }}>
                            {item.color[0]}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '.9rem',
                              fontWeight: '500',
                              marginTop: '10px',
                            }}
                          >
                            ${item.price}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: '2px',
                          left: '0',
                        }}
                        color="error"
                        onClick={() => handleRemoveOrder(item._id)}
                      >
                        <DeleteOutlineIcon
                          sx={{
                            '&.MuiSvgIcon-root': {
                              fontSize: '18px',
                            },
                          }}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.status}</TableCell>
                    <TableCell align="right">${item.total}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">${data?.subTotal}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default Order;
