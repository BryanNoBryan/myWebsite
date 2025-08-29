export function isMobile() {
    let orientation = screen.orientation.type;
    console.log(`orientation ${orientation}`);

    if (orientation == 'portrait-primary' || orientation == 'portrait-secondary') {
        return true;
    } else if (orientation == 'landscape-primary' || orientation == 'landscape-secondary') {
        return false;
    } else {
        return false;
    }   
}

export function isSmall() {
    let width = screen.height;
    let height = screen.width;

    if (width < 600 || height < 1000) {
        return true;
    } else {
        return false;
    }
}