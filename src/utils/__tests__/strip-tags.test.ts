import { describe, it, expect } from 'vitest';
import stripTags from '../strip-tags';

describe('stripTags', () => {
    it('should remove HTML tags from a string', () => {
        const htmlString =
            '<p>This is a <strong>test</strong> string with <em>HTML</em> tags.</p>';
        const expectedString = 'This is a test string with HTML tags.';
        expect(stripTags(htmlString)).toBe(expectedString);
    });

    it('should return an empty string if input is an empty string', () => {
        const htmlString = '';
        const expectedString = '';
        expect(stripTags(htmlString)).toBe(expectedString);
    });

    it('should return the same string if there are no HTML tags', () => {
        const htmlString = 'This is a plain text string.';
        const expectedString = 'This is a plain text string.';
        expect(stripTags(htmlString)).toBe(expectedString);
    });

    it('should handle self-closing tags correctly', () => {
        const htmlString =
            'This is a string with a self-closing tag: <br/> and another one: <img src="image.jpg" />';
        const expectedString =
            'This is a string with a self-closing tag:  and another one: ';
        expect(stripTags(htmlString)).toBe(expectedString);
    });

    it('should handle nested tags correctly', () => {
        const htmlString =
            '<div><p>This is a <span>nested</span> tag.</p></div>';
        const expectedString = 'This is a nested tag.';
        expect(stripTags(htmlString)).toBe(expectedString);
    });
});
