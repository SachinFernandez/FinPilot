import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { Transaction, TransactionType } from "../types/transaction";
import { sampleTransactions } from "../data/transactions";

const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

function Transactions() {
    // Transaction list
    const [transactions, setTransactions] =
        useState<Transaction[]>(sampleTransactions);

    // Search
    const [search, setSearch] = useState("");

    const [transactionFilter, setTransactionFilter] =
        useState<"ALL" | "INCOME" | "EXPENSE">("ALL");

    const [editingTransaction, setEditingTransaction] =
        useState<Transaction | null>(null);

    const [deleteTransactionId, setDeleteTransactionId] =
        useState<number | null>(null);

    // Dialog
    const [openDialog, setOpenDialog] = useState(false);

    // Form fields
    const [title, setTitle] = useState("");
    const [type, setType] = useState<TransactionType>("EXPENSE");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(getToday());
    const [paymentMethod, setPaymentMethod] = useState("");
    const [notes, setNotes] = useState("");

    // Form validation
    const [formError, setFormError] = useState("");

    // Reset form
    const resetForm = () => {
        setTitle("");
        setType("EXPENSE");
        setAmount("");
        setCategory("");
        setDate(getToday());
        setPaymentMethod("");
        setNotes("");
        setFormError("");
    };

    // Open dialog
    const handleOpenDialog = () => {
        resetForm();
        setOpenDialog(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        resetForm();
        setEditingTransaction(null);
    };

    const handleEditTransaction = (transaction: Transaction) => {
        setEditingTransaction(transaction);

        setTitle(transaction.title);
        setType(transaction.type);
        setAmount(String(transaction.amount));
        setCategory(transaction.category);
        setDate(transaction.date);
        setPaymentMethod(transaction.paymentMethod);
        setNotes(transaction.notes ?? "");

        setFormError("");
        setOpenDialog(true);
    };

    // Add transaction
    const handleAddTransaction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const numericAmount = Number(amount);

        if (!title.trim()) {
            setFormError("Please enter a transaction title.");
            return;
        }

        if (!amount.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
            setFormError("Please enter a valid amount greater than zero.");
            return;
        }

        if (!category || !date || !paymentMethod) {
            setFormError("Please complete all required fields.");
            return;
        }

        const newTransaction: Transaction = {
            id: Date.now(),
            title: title.trim(),
            type,
            amount: numericAmount,
            category,
            date,
            paymentMethod,
            notes: notes.trim(),
        };

        setTransactions((previousTransactions) => [
            newTransaction,
            ...previousTransactions,
        ]);

        handleCloseDialog();
    };

    const handleUpdateTransaction = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const numericAmount = Number(amount);

        if (!title.trim()) {
            setFormError("Please enter a transaction title.");
            return;
        }

        if (!amount.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
            setFormError("Please enter a valid amount greater than zero.");
            return;
        }

        if (!category || !date || !paymentMethod) {
            setFormError("Please complete all required fields.");
            return;
        }

        if (!editingTransaction) return;

        const updatedTransaction: Transaction = {
            ...editingTransaction,
            title: title.trim(),
            type,
            amount: numericAmount,
            category,
            date,
            paymentMethod,
            notes: notes.trim(),
        };

        setTransactions((previousTransactions) =>
            previousTransactions.map((transaction) =>
                transaction.id === editingTransaction.id
                    ? updatedTransaction
                    : transaction
            )
        );

        handleCloseDialog();
        setEditingTransaction(null);
    };

    const handleDeleteTransaction = () => {
        if (deleteTransactionId === null) return;

        setTransactions((previousTransactions) =>
            previousTransactions.filter(
                (transaction) => transaction.id !== deleteTransactionId
            )
        );

        setDeleteTransactionId(null);
    };

    // Filter transactions
    const filteredTransactions = useMemo(() => {
        const searchText = search.toLowerCase().trim();

        return transactions.filter((transaction) => {
            const matchesSearch = [
                transaction.title,
                transaction.category,
                transaction.paymentMethod,
                transaction.type,
            ]
                .join(" ")
                .toLowerCase()
                .includes(searchText);

            const matchesType =
                transactionFilter === "ALL" ||
                transaction.type === transactionFilter;

            return matchesSearch && matchesType;
        });
    }, [search, transactions, transactionFilter]);

    // DataGrid columns
    const columns: GridColDef<Transaction>[] = [
        {
            field: "title",
            headerName: "Transaction",
            flex: 1.5,
            minWidth: 180,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            minWidth: 130,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 0.8,
            minWidth: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={params.value === "INCOME" ? "success" : "error"}
                    variant="outlined"
                />
            ),
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
            minWidth: 130,
            renderCell: (params) => (
                <Typography
                    sx={{ fontWeight: 700 }}
                    color={
                        params.row.type === "INCOME" ? "success.main" : "error.main"
                    }
                >
                    {params.row.type === "INCOME" ? "+" : "-"}
                    {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 2,
                    }).format(Number(params.value))}
                </Typography>
            ),
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            minWidth: 120,
        },
        {
            field: "paymentMethod",
            headerName: "Payment Method",
            flex: 1,
            minWidth: 150,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            minWidth: 140,
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: "100%" }}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEditTransaction(params.row)}
                    >
                        Edit
                    </Button>

                    <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => setDeleteTransactionId(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            {/* Page Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 750 }}>
                        Transactions
                    </Typography>

                    <Typography sx={{ mt: 0.5, color: "text.secondary" }}>
                        Track and manage your income and expenses.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                >
                    Add Transaction
                </Button>
            </Box>

            {/* Search and Transaction Filters */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 2,
                }}
            >
                <TextField
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    size="small"
                    sx={{ width: { xs: "100%", sm: 300 } }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Box sx={{ display: "flex", gap: 1 }}>
                    {(["ALL", "INCOME", "EXPENSE"] as const).map((filter) => (
                        <Button
                            key={filter}
                            size="small"
                            variant={transactionFilter === filter ? "contained" : "outlined"}
                            color={
                                filter === "INCOME"
                                    ? "success"
                                    : filter === "EXPENSE"
                                        ? "error"
                                        : "primary"
                            }
                            onClick={() => setTransactionFilter(filter)}
                        >
                            {filter === "ALL"
                                ? "All"
                                : filter === "INCOME"
                                    ? "Income"
                                    : "Expense"}
                        </Button>
                    ))}
                </Box>
            </Box>


            {/* Transactions DataGrid */}
            <Box
                sx={{
                    width: "100%",
                    "& .MuiDataGrid-root": {
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "background.paper",
                    },
                }}
            >
                <DataGrid
                    rows={filteredTransactions}
                    columns={columns}
                    getRowId={(row) => row.id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0,
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                    autoHeight
                />
            </Box>

            {/* Add Transaction Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
            >
                <Box
                    component="form"
                    onSubmit={
                        editingTransaction
                            ? handleUpdateTransaction
                            : handleAddTransaction
                    }
                >
                    <DialogTitle sx={{ fontWeight: 750 }}>
                        {editingTransaction ? "Edit Transaction" : "Add Transaction"}
                    </DialogTitle>

                    <DialogContent>
                        <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                            Enter your income or expense details.
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <TextField
                                select
                                label="Transaction Type"
                                value={type}
                                onChange={(event) =>
                                    setType(event.target.value as TransactionType)
                                }
                                fullWidth
                                required
                            >
                                <MenuItem value="INCOME">Income</MenuItem>
                                <MenuItem value="EXPENSE">Expense</MenuItem>
                            </TextField>

                            <TextField
                                label="Transaction Title"
                                placeholder="e.g. Monthly Salary"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                fullWidth
                                required
                            />

                            <TextField
                                label="Amount"
                                type="number"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                fullWidth
                                required
                                slotProps={{
                                    htmlInput: {
                                        min: 0,
                                        step: "0.01",
                                    },
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">₹</InputAdornment>
                                        ),
                                    },
                                }}
                            />

                            <TextField
                                select
                                label="Category"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                fullWidth
                                required
                            >
                                <MenuItem value="Salary">Salary</MenuItem>
                                <MenuItem value="Freelance">Freelance</MenuItem>
                                <MenuItem value="Groceries">Groceries</MenuItem>
                                <MenuItem value="Utilities">Utilities</MenuItem>
                                <MenuItem value="Transport">Transport</MenuItem>
                                <MenuItem value="Entertainment">Entertainment</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>

                            <TextField
                                label="Date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                fullWidth
                                required
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                            <TextField
                                select
                                label="Payment Method"
                                value={paymentMethod}
                                onChange={(event) => setPaymentMethod(event.target.value)}
                                fullWidth
                                required
                            >
                                <MenuItem value="UPI">UPI</MenuItem>
                                <MenuItem value="Cash">Cash</MenuItem>
                                <MenuItem value="Credit Card">Credit Card</MenuItem>
                                <MenuItem value="Debit Card">Debit Card</MenuItem>
                                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>

                            <TextField
                                label="Notes (Optional)"
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                                fullWidth
                                multiline
                                minRows={2}
                            />

                            {formError && (
                                <Typography color="error" variant="body2">
                                    {formError}
                                </Typography>
                            )}
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={handleCloseDialog} color="inherit">
                            Cancel
                        </Button>

                        <Button type="submit" variant="contained">
                            {editingTransaction ? "Update Transaction" : "Save Transaction"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog
                open={deleteTransactionId !== null}
                onClose={() => setDeleteTransactionId(null)}
            >
                <DialogTitle sx={{ fontWeight: 750 }}>
                    Delete Transaction?
                </DialogTitle>

                <DialogContent>
                    <Typography color="text.secondary">
                        Are you sure you want to delete this transaction?
                        This action cannot be undone.
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={() => setDeleteTransactionId(null)}
                        color="inherit"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleDeleteTransaction}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Transactions;
