import { DataGrid as MuiDataGrid } from '@mui/x-data-grid/DataGrid';
import { styled } from '@mui/material/styles';

const DataGrid = styled(MuiDataGrid)(() => ({
  color: 'var(--primary)',
  backgroundColor: 'var(--background)',
  borderColor: 'var(--divider)',
  '--DataGrid-rowBorderColor': 'var(--divider)',
  '.MuiDataGrid-container--top [role=row]': {
    backgroundColor: 'var(--background)',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'var(--background)',
    '--DataGrid-t-color-interactive-focus': 'var(--outline) ',
  },
  '& .MuiDataGrid-row': {
    '--DataGrid-t-color-interactive-focus': 'var(--outline) ',
    '&:hover': {
      backgroundColor: 'var(--hover)',
    },
    '&.Mui-selected': {
      backgroundColor: 'var(--selected)',
      '&:hover': {
        backgroundColor: 'var(--selected)',
      },
    },
    '&.MuiDataGrid-rowSkeleton': {
      backgroundColor: 'var(--background)',
      '&:hover': {
        backgroundColor: 'var(--background)',
      },
      '& .MuiSkeleton-root': {
        backgroundColor: 'var(--divider)',
      },
    },
  },
  '& .MuiTablePagination-root': {
    color: 'var(--primary)',
    '& .Mui-disabled': {
      color: 'var(--disabled)',
    },
  },
  '& .MuiDataGrid-withBorderColor': {
    borderColor: 'var(--divider)',
  },
}));

export default DataGrid;
