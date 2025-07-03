import { Suspense, lazy } from "react";
import { Layout } from "../dashboard/layout";
import { Outlet } from "react-router-dom";
import { paths } from "../paths";

const HomePage = lazy(() => import('src/pages/home'))
const CriarNovaCampanhaPage = lazy(() => import('src/pages/campanhas'))
const CampanhasListPage = lazy(() => import('src/pages/campanhas/listagem'))

const NumerosPage = lazy(() => import('src/pages/numeros'))

const PlayGroundPage = lazy(() => import('src/pages/playground'))

const BotFlowPage = lazy(() => import('src/pages/bot-flow'))

const TelemetriaPge = lazy(() => import('src/pages/telemetria'))

const TypeBotPage = lazy(() => import('src/pages/typebots'))
const TypeBotViewerPage = lazy(() => import('src/pages/typebots/viewer'))

const InscricoesPage = lazy(() => import('src/pages/inscricoes'))

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
                element: <HomePage/>
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
            {
                path: paths.botFlow.index,
                children: [
                    {
                        index: true,
                        element: <BotFlowPage />
                    }
                ]
            },
            {
                path: paths.telemetria.index,
                children: [
                    {
                        index: true,
                        element: <TelemetriaPge />
                    }
                ]
            },
            {
                path: paths.typebot.index,
                children: [
                    {
                        index: true,
                        element: <TypeBotPage />
                    },
                    {
                        path: paths.typebot.viewer,
                        element: <TypeBotViewerPage />
                    },
                ]
            },
            {
                path: paths.inscricoes.index,
                children: [
                    {
                        index: true,
                        element: <InscricoesPage />
                    }
                ]
            },
        ]
    }
]
