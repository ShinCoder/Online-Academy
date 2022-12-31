import GithubSlugger from 'github-slugger';
import coursesService from '../services/courses.service.js';

const slugger = new GithubSlugger();

export default {
  async getCourseUniqueSlug(str) {
    const tempSlug = slugger.slug(str);
    const alikeSlug = await coursesService.findSlugAlike(tempSlug);
    const slug = tempSlug + '-' + (alikeSlug.length + 1);
    return slug;
  },

  getCategorySlug(str) {
    return slugger.slug(str);
  }
};
