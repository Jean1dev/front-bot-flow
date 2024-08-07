
import { useSettings } from 'src/hooks/use-settings';

import { useSections } from './itens-menu';
import { HorizontalLayout } from './horizontal-layout';
import { VerticalLayout } from './vertical-layout';

export const Layout = (props) => {
    const settings = useSettings();
    const sections = useSections();

    if (settings.layout === 'horizontal') {
        return (
            <HorizontalLayout
                sections={sections}
                navColor={settings.navColor}
                {...props} />
        );
    }

    return (
        <VerticalLayout
            sections={sections}
            navColor={settings.navColor}
            {...props} />
    );
};
