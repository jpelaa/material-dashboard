import { Box, Card, CardContent, Container } from "@mui/material";
import { useState } from "react";
import { mobileKeyStatus } from "src/__mocks__/mobile_key_status";
import { CustomerListToolbar } from "./customer-list-toolbar";
import { MobileKeyStatusListResults } from "./mobile-key-status-list-results";

const MobileKeyStatus = () => {
    const [enableFilter, setEnableFilter] = useState(false);

    const [commonFilterValue, setCommonFilterValue] = useState('');
    const [filters, setFilters] = useState({});

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    const handleFilterChange = (event) => {
        setEnableFilter(event.target.checked);
        if (event.target.checked === false) {
            setFilters({})
        }
    }

    const handleCommonFilterValueChange = (event) => {
        setCommonFilterValue(event.target.value)
    }

    const handleIndividualFilterChange = ({ id, value }) => {
        const filtersCopy = { ...filters };
        if (value === undefined) {
            delete filtersCopy[id];
        } else {
            filtersCopy[id] = value;
        }
        setFilters(filtersCopy)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleReset = () => {
        setOrder('asc');
        setOrderBy('');
        setFilters({});
        setCommonFilterValue('');
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
                        handleReset={handleReset}
                    />
                    <Box sx={{ mt: 3 }}>
                        <MobileKeyStatusListResults
                            enableFilter={enableFilter}
                            mobileKeyStatusList={mobileKeyStatus}
                            commonFilterValue={commonFilterValue}
                            filters={filters}
                            handleIndividualFilterChange={handleIndividualFilterChange}
                            handleRequestSort={handleRequestSort}
                            order={order}
                            orderBy={orderBy}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default MobileKeyStatus;
