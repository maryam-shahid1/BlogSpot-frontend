import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import '../index.css'


export const CustomAlert = ({message, open, setOpen, severity}) => {
  return (
    <div>
        <Box sx={{ width: '100%' }}>
                  <Collapse in={open}>
                    <Alert
                      className='alert'
                      severity={severity}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      {message}
                    </Alert>
                  </Collapse>
                </Box>
    </div>
  )
}

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired, 
    setOpen: PropTypes.func.isRequired, 
    severity: PropTypes.string.isRequired, 
};

export default CustomAlert;
