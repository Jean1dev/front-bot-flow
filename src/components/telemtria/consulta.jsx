import {
    Container,
    Stack,
    Typography,
    Breadcrumbs,
    Link,
    Box,
    Card,
} from "@mui/material"
import { RouterLink } from "src/components/router-link";
import { RegistrosTable } from "./registros-table";
import { useEffect, useState } from "react";
import { telemetriaApi } from '../../api/telemetria';

const remapData = (data) => {
    return data.map(item => {
        const newData = {}
        newData.quantidade = item.registros.length
        newData.numeroId = item.numeroId
        newData.registros = item.registros
        return newData
    })
}

export const ConsultaTelemetria = () => {
    const [registros, setRegistros] = useState([])

    useEffect(() => {
        telemetriaApi.get().then((response) => {
            setRegistros(remapData(response.data))
        })
    }, [])

    return (
        <Container maxWidth="xl">
            <Stack spacing={4}>
                <Stack spacing={1}>
                    <Typography variant="h4">
                        Registros por numero
                    </Typography>
                    <Breadcrumbs separator={<Box
                        sx={{
                            backgroundColor: 'neutral.500',
                            borderRadius: '50%',
                            height: 4,
                            width: 4
                        }}
                    />}>
                        <Link
                            color="text.primary"
                            component={RouterLink}
                            href={'/'}
                            variant="subtitle2"
                        >
                            Dashboard
                        </Link>
                        <Typography
                            color="text.secondary"
                            variant="subtitle2"
                        >
                            Registros
                        </Typography>
                    </Breadcrumbs>
                </Stack>

                <Card>
                    <RegistrosTable
                        onPageChange={() => { }}
                        onRowsPerPageChange={() => { }}
                        page={1}
                        items={registros}
                        count={registros.length}
                        rowsPerPage={5}
                    />
                </Card>
            </Stack>
        </Container>
    )
}