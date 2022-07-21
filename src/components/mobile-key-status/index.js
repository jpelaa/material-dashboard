import { Box, Card, CardContent, Container } from "@mui/material";
import { useState } from "react";
import { mobileKeyStatus } from "src/__mocks__/mobile_key_status";
import { CustomerListToolbar } from "./customer-list-toolbar";
import { MobileKeyStatusListResults } from "./mobile-key-status-list-results";

const MobileKeyStatus = () => {
    const [enableFilter, setEnableFilter] = useState(false);

    const [commonFilterValue, setCommonFilterValue] = useState('');
    const [filters, setFilters] = useState({});

    const handleFilterChange = (event) => {
        setEnableFilter(event.target.checked);
    }

    const handleCommonFilterValueChange = (event) => {
        setCommonFilterValue(event.target.value)
    }

    const handleIndividualFilterChange = ({ id, value }) => {
        setFilters({
            ...filters,
            [id]: value
        })
    }

    console.log(enableFilter, filters, commonFilterValue, " enableFilter ")
    return (
        <Container maxWidth={false}>
            <Card>
                <CardContent>
                    <CustomerListToolbar
                        enableFilter={enableFilter}
                        handleFilterChange={handleFilterChange}
                        commonFilterValue={commonFilterValue}
                        handleCommonFilterValueChange={handleCommonFilterValueChange}
                        filters={filters}
                        handleIndividualFilterChange={handleIndividualFilterChange}
                    />
                    <Box sx={{ mt: 3 }}>
                        <MobileKeyStatusListResults
                            enableFilter={enableFilter}
                            mobileKeyStatusList={mobileKeyStatus}
                            commonFilterValue={commonFilterValue}
                            filters={filters}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default MobileKeyStatus;
