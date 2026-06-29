import { BlogPost } from '../types';
import { blogsPart1 } from './blogs_part1';
import { blogsPart2 } from './blogs_part2';

export const blogs: BlogPost[] = [...blogsPart1, ...blogsPart2];
