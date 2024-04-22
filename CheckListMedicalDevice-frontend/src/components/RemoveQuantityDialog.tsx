import React from 'react';
import { Dialog, Box, Typography, TextField, Button } from '@mui/material';

interface RemoveQuantityDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (quantity: string) => void;
    quantityToRemove: string;
    setQuantityToRemove: React.Dispatch<React.SetStateAction<string>>;
}

const RemoveQuantityDialog: React.FC<RemoveQuantityDialogProps> = ({
    open,
    onClose,
    onConfirm,
    quantityToRemove,
    setQuantityToRemove,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <Box p={2}>
                <Typography variant="h6">ลบจำนวนอุปกรณ์</Typography>
                <TextField
                    label="จำนวนที่ต้องการลบ"
                    type="number"
                    value={quantityToRemove}
                    onChange={(e) => setQuantityToRemove(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={onClose}>ยกเลิก</Button>
                <Button onClick={() => onConfirm(quantityToRemove)}>ยืนยัน</Button>
            </Box>
        </Dialog>
    );
};

export default RemoveQuantityDialog;
