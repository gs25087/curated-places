import { Box, IconButton, Typography } from '@mui/material';
import { CaretLeft, X } from '@phosphor-icons/react';
import { ICategoryNavTitleProps } from 'src/types/taxonomy/taxonomy';

export const CategoryNavTitle = ({
  title,
  selectedTaxonomy,
  setSelectedTaxonomy,
  setOpen
}: ICategoryNavTitleProps) => {
  console.log(selectedTaxonomy, 'from catnavtitle component');
  function handleClick() {
    if (selectedTaxonomy.parent && selectedTaxonomy.id) {
      setSelectedTaxonomy({ id: selectedTaxonomy.parent, level: 0, parent: null });
    } else if (selectedTaxonomy.parent === null && selectedTaxonomy.id) {
      setSelectedTaxonomy({ id: null, level: null, parent: null });
    } else if (selectedTaxonomy.parent === null && selectedTaxonomy.id === null) {
      setSelectedTaxonomy({ id: null, level: null, parent: null });
      if (setOpen) setOpen(false);
    }
  }

  return (
    <Box display="flex" alignItems="center">
      <IconButton aria-label="close" size="large" onClick={() => handleClick()}>
        {selectedTaxonomy.level !== null ? (
          <CaretLeft size={24} weight="light" />
        ) : (
          <X size={24} weight="light" />
        )}
      </IconButton>
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};
