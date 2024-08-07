import Slider from 'react-slick';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { RouterLink } from 'src/components/router-link';

const sliderSettings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export const OverviewTips = (props) => {
    const { sx, tips } = props;

    return (
        <Card sx={sx}>
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <Box sx={{ mb: 6 }}>
                    <img src="/assets/next-tip.svg" />
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        '& .slick-slider': {
                            cursor: 'grab',
                        },
                        '& .slick-slider, & .slick-list, & .slick-track': {
                            height: '100%',
                        },
                        '& .slick-dots': {
                            top: -50,
                            bottom: 'unset',
                            left: -10,
                            textAlign: 'left',
                        },
                    }}
                >
                    <Slider {...sliderSettings}>
                        {tips.map((tip) => (
                            <div key={tip.title}>
                                <Typography variant="h6">
                                    {tip.title}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                    variant="body1"
                                >
                                    {tip.content}
                                </Typography>
                                {tip.link && (
                                    <Button
                                        component={RouterLink}
                                        href={tip.link}

                                        target='_blank'
                                    >
                                        {tip.linkLabel || 'Learn More'}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </Slider>
                </Box>
            </CardContent>
        </Card>
    );
};

OverviewTips.propTypes = {
    sx: PropTypes.object,
    tips: PropTypes.array.isRequired,
};
