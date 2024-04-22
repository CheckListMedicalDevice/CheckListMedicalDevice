import React from 'react';
import { Dialog, Box, Typography, TextField, Button } from '@mui/material';

interface AddQuantityDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (quantity: string) => void;
    quantityToAdd: string;
    setQuantityToAdd: React.Dispatch<React.SetStateAction<string>>;
}

const AddQuantityDialog: React.FC<AddQuantityDialogProps> = ({
    open,
    onClose,
    onConfirm,
    quantityToAdd,
    setQuantityToAdd,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <Box p={2}>
                <Typography variant="h6">เพิ่มจำนวนอุปกรณ์</Typography>
                <TextField
                    label="จำนวนที่ต้องการเพิ่ม"
                    type="number"
                    value={quantityToAdd}
                    onChange={(e) => setQuantityToAdd(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={onClose}>ยกเลิก</Button>
                <Button onClick={() => onConfirm(quantityToAdd)}>ยืนยัน</Button>
            </Box>
        </Dialog>
    );
};

export default AddQuantityDialog;
