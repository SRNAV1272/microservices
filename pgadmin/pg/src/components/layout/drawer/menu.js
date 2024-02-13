import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import TableViewIcon from '@mui/icons-material/TableView';
import WrapTextIcon from '@mui/icons-material/WrapText';

export default function MenuList(props) {
    const { toggleDrawer } = props
    const columns = [
        {
            name: 'Table',
            icon: <TableViewIcon />
        },
        {
            name: 'Insert',
            icon: <WrapTextIcon />
        }
    ]
    return (
        <div>
            <Box
                sx={{ width: 180 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                {/* eslint-disable-next-line */}
                <List sx={{ overflow: 'auto', height: window.innerHeight }}>
                    {columns.map((text, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {
                                        text.icon
                                    }
                                </ListItemIcon>
                                <ListItemText primary={<Typography>{text.name}</Typography>} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    )
}
