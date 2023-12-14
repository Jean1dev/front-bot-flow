import { Suspense, lazy } from "react";
import { Layout } from "../dashboard/layout";
import { Outlet } from "react-router-dom";

const BotFlowView = lazy(() => import('src/pages/bot-flow'))

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
                element: <BotFlowView/>
            }
        ]
    }
]