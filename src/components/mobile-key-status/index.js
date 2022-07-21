import { Box, Card, CardContent, Container } from "@mui/material";
import { useState } from "react";
import { mobileKeyStatus } from "src/__mocks__/mobile_key_status";
import { CustomerListToolbar } from "./customer-list-toolbar";
import { MobileKeyStatusListResults } from "./mobile-key-status-list-results";

const MobileKeyStatus = () => {
    const [enableFilter, setEnableFilter] = useState(false);

    const handleFilterChange = (event) => {
        setEnableFilter(event.target.checked);
    }

    console.log(enableFilter, " enableFilter ")
    return (
        <Container maxWidth={false}>
            <Card>
                <CardContent>
                    <CustomerListToolbar enableFilter={enableFilter} handleFilterChange={handleFilterChange} />
                    <Box sx={{ mt: 3 }}>
                        <MobileKeyStatusListResults
                            enableFilter={enableFilter}
                            mobileKeyStatusList={mobileKeyStatus}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default MobileKeyStatus;
