const stripTags = (html: string): string => {
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, '');
};

export default stripTags;
