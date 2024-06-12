import { Suspense, lazy } from "react";
import { Layout } from "../dashboard/layout";
import { Outlet } from "react-router-dom";
import { paths } from "../paths";

const CriarNovaCampanhaPage = lazy(() => import('src/pages/campanhas'))
const CampanhasListPage = lazy(() => import('src/pages/campanhas/listagem'))

const NumerosPage = lazy(() => import('src/pages/numeros'))

const PlayGroundPage = lazy(() => import('src/pages/playground'))

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
                path: paths.campanhas.index,
                children: [
                    {
                        index: true,
                        element: <CampanhasListPage />
                    },
                    {
                        path: paths.campanhas.criar,
                        element: <CriarNovaCampanhaPage />
                    },
                ]
            },
            {
                path: paths.numeros.index,
                children: [
                    {
                        index: true,
                        element: <NumerosPage />
                    }
                ]
            },
            {
                path: paths.playground.index,
                children: [
                    {
                        index: true,
                        element: <PlayGroundPage />
                    }
                ]
            },
        ]
    }
]