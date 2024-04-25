import { Suspense, lazy } from "react";
import { Layout } from "../dashboard/layout";
import { Outlet } from "react-router-dom";
import { paths } from "../paths";

const CriarNovaCampanhaPage = lazy(() => import('src/pages/campanhas'))
const NumerosPage = lazy(() => import('src/pages/numeros'))

export const routes = [
    {
        path: '/',
        element: (
            <Layout>
                <Suspense>
                    <Outlet />
                </Suspense>
            </Layout>
        ),
        children: [
            {
                index: true,
                element: <h1>wip</h1>
            },
            {
                path: paths.campanhas.criar,
                children: [
                    {
                        index: true,
                        element: <CriarNovaCampanhaPage />
                    }
                ]
            },
            {
                path: paths.numeros.list,
                children: [
                    {
                        index: true,
                        element: <NumerosPage />
                    }
                ]
            },
        ]
    }
]