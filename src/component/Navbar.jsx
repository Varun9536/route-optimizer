import { AppBar , Toolbar, Typography } from "@mui/material"

const Navbar = () => {
    return (
        <>
            <AppBar position="sticky" >
                <Toolbar >
                    <Typography variant="h4">
                        The Route Optimizer
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
