import { Outlet, useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import { GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid';

import useHeroes from '@hooks/useHeroes';

import { AppRoutePathnames } from '@config/constants';
import { DataSetInfo } from '@api/rick-and-morty/types';

import DataGrid from '@components/ui/DataGrid';

const ROWS_PER_PAGE = 20;

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 100 },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 100,
  },
];

export default function HeroesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSetInfo, setDataSetInfo] = useState<DataSetInfo | null>(null);

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set(),
  });

  const { data, loading } = useHeroes(currentPage);

  const rows = useMemo(() => {
    if (!data) {
      return Array.from({ length: ROWS_PER_PAGE }, (_, index) => ({ id: index }));
    }
    return data.results.map(({ id, name, status }) => ({ id, name, status }));
  }, [data]);

  const navigate = useNavigate();

  const removeRowSelection = () => {
    rowSelectionModel.ids.clear();
    setRowSelectionModel(rowSelectionModel);
  };

  const handleRowSelectionModelChange = (newRowSelectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    if (newRowSelectionModel.ids.size === 0) {
      navigate(`${AppRoutePathnames.HEROES}`);
    }
  };

  const handleRowClick = ({ id }: GridRowParams) => {
    navigate(`${AppRoutePathnames.HEROES}/${id}`);
  };

  useEffect(() => {
    if (loading || !data) return;
    setDataSetInfo(data.info);
  }, [loading, data]);

  return (
    <Box
      sx={{
        display: 'flex',
        maxHeight: loading ? 1235 : 'auto',
        minHeight: 0,
        flexGrow: loading ? 1 : 'unset',
        justifyContent: 'center',
        py: { xs: 2, md: 3, lg: 5 },
        px: { xs: 1, md: 2, lg: 5 },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={dataSetInfo?.count ?? 0}
        rowSelectionModel={rowSelectionModel}
        paginationMode='server'
        pageSizeOptions={[ROWS_PER_PAGE]}
        loading={loading}
        disableMultipleRowSelection
        disableColumnResize
        disableColumnFilter
        disableColumnMenu
        disableColumnSorting
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: rows.length,
            },
          },
        }}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
          },
        }}
        onPaginationModelChange={({ page }) => setCurrentPage(page + 1)}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        onRowClick={handleRowClick}
      />
      <Outlet context={{ removeHeroRowSelection: removeRowSelection }} />
    </Box>
  );
}
