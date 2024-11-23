/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/admin': RouteRecordInfo<'/admin', '/admin', Record<never, never>, Record<never, never>>,
    '/admin/attendance': RouteRecordInfo<'/admin/attendance', '/admin/attendance', Record<never, never>, Record<never, never>>,
    '/admin/community': RouteRecordInfo<'/admin/community', '/admin/community', Record<never, never>, Record<never, never>>,
    '/admin/community/': RouteRecordInfo<'/admin/community/', '/admin/community', Record<never, never>, Record<never, never>>,
    '/admin/contacts': RouteRecordInfo<'/admin/contacts', '/admin/contacts', Record<never, never>, Record<never, never>>,
    '/admin/contacts/': RouteRecordInfo<'/admin/contacts/', '/admin/contacts', Record<never, never>, Record<never, never>>,
    '/admin/limits': RouteRecordInfo<'/admin/limits', '/admin/limits', Record<never, never>, Record<never, never>>,
    '/admin/limits/': RouteRecordInfo<'/admin/limits/', '/admin/limits', Record<never, never>, Record<never, never>>,
    '/admin/profile': RouteRecordInfo<'/admin/profile', '/admin/profile', Record<never, never>, Record<never, never>>,
    '/admin/profile/': RouteRecordInfo<'/admin/profile/', '/admin/profile', Record<never, never>, Record<never, never>>,
    '/admin/recruitment': RouteRecordInfo<'/admin/recruitment', '/admin/recruitment', Record<never, never>, Record<never, never>>,
    '/admin/recruitment/': RouteRecordInfo<'/admin/recruitment/', '/admin/recruitment', Record<never, never>, Record<never, never>>,
    '/admin/recruitment/candidates': RouteRecordInfo<'/admin/recruitment/candidates', '/admin/recruitment/candidates', Record<never, never>, Record<never, never>>,
    '/admin/recruitment/interview': RouteRecordInfo<'/admin/recruitment/interview', '/admin/recruitment/interview', Record<never, never>, Record<never, never>>,
    '/application': RouteRecordInfo<'/application', '/application', Record<never, never>, Record<never, never>>,
    '/community': RouteRecordInfo<'/community', '/community', Record<never, never>, Record<never, never>>,
    '/community/blog': RouteRecordInfo<'/community/blog', '/community/blog', Record<never, never>, Record<never, never>>,
    '/community/blog/': RouteRecordInfo<'/community/blog/', '/community/blog', Record<never, never>, Record<never, never>>,
    '/community/blog/RecruitmentFrom': RouteRecordInfo<'/community/blog/RecruitmentFrom', '/community/blog/RecruitmentFrom', Record<never, never>, Record<never, never>>,
    '/community/blog/user': RouteRecordInfo<'/community/blog/user', '/community/blog/user', Record<never, never>, Record<never, never>>,
    '/community/brainstorm': RouteRecordInfo<'/community/brainstorm', '/community/brainstorm', Record<never, never>, Record<never, never>>,
    '/community/brainstorm/': RouteRecordInfo<'/community/brainstorm/', '/community/brainstorm', Record<never, never>, Record<never, never>>,
    '/community/comprehensive': RouteRecordInfo<'/community/comprehensive', '/community/comprehensive', Record<never, never>, Record<never, never>>,
    '/community/comprehensive/': RouteRecordInfo<'/community/comprehensive/', '/community/comprehensive', Record<never, never>, Record<never, never>>,
    '/community/comprehensive/[title]': RouteRecordInfo<'/community/comprehensive/[title]', '/community/comprehensive/:title', { title: ParamValue<true> }, { title: ParamValue<false> }>,
    '/community/comprehensive/user': RouteRecordInfo<'/community/comprehensive/user', '/community/comprehensive/user', Record<never, never>, Record<never, never>>,
    '/community/discussion': RouteRecordInfo<'/community/discussion', '/community/discussion', Record<never, never>, Record<never, never>>,
    '/community/discussion/': RouteRecordInfo<'/community/discussion/', '/community/discussion', Record<never, never>, Record<never, never>>,
    '/community/discussion/label': RouteRecordInfo<'/community/discussion/label', '/community/discussion/label', Record<never, never>, Record<never, never>>,
    '/community/discussion/latest': RouteRecordInfo<'/community/discussion/latest', '/community/discussion/latest', Record<never, never>, Record<never, never>>,
    '/community/discussion/tag/': RouteRecordInfo<'/community/discussion/tag/', '/community/discussion/tag', Record<never, never>, Record<never, never>>,
    '/community/discussion/tag/RightBar': RouteRecordInfo<'/community/discussion/tag/RightBar', '/community/discussion/tag/RightBar', Record<never, never>, Record<never, never>>,
    '/community/discussion/user': RouteRecordInfo<'/community/discussion/user', '/community/discussion/user', Record<never, never>, Record<never, never>>,
    '/community/notice': RouteRecordInfo<'/community/notice', '/community/notice', Record<never, never>, Record<never, never>>,
    '/community/notice/': RouteRecordInfo<'/community/notice/', '/community/notice', Record<never, never>, Record<never, never>>,
    '/login': RouteRecordInfo<'/login', '/login', Record<never, never>, Record<never, never>>,
    '/message': RouteRecordInfo<'/message', '/message', Record<never, never>, Record<never, never>>,
    '/message/all': RouteRecordInfo<'/message/all', '/message/all', Record<never, never>, Record<never, never>>,
    '/message/all/': RouteRecordInfo<'/message/all/', '/message/all', Record<never, never>, Record<never, never>>,
    '/personalCenter': RouteRecordInfo<'/personalCenter', '/personalCenter', Record<never, never>, Record<never, never>>,
    '/personalCenter/userInfo': RouteRecordInfo<'/personalCenter/userInfo', '/personalCenter/userInfo', Record<never, never>, Record<never, never>>,
    '/personalCenter/userInfo/myCollections': RouteRecordInfo<'/personalCenter/userInfo/myCollections', '/personalCenter/userInfo/myCollections', Record<never, never>, Record<never, never>>,
    '/personalCenter/userInfo/myCollections/': RouteRecordInfo<'/personalCenter/userInfo/myCollections/', '/personalCenter/userInfo/myCollections', Record<never, never>, Record<never, never>>,
    '/personalCenter/userInfo/myGrades': RouteRecordInfo<'/personalCenter/userInfo/myGrades', '/personalCenter/userInfo/myGrades', Record<never, never>, Record<never, never>>,
    '/personalCenter/userInfo/myGrades/': RouteRecordInfo<'/personalCenter/userInfo/myGrades/', '/personalCenter/userInfo/myGrades', Record<never, never>, Record<never, never>>,
    '/personalCenter/userInfo/myPosts': RouteRecordInfo<'/personalCenter/userInfo/myPosts', '/personalCenter/userInfo/myPosts', Record<never, never>, Record<never, never>>,
    '/personalCenter/userInfo/myPosts/': RouteRecordInfo<'/personalCenter/userInfo/myPosts/', '/personalCenter/userInfo/myPosts', Record<never, never>, Record<never, never>>,
    '/personalCenter/userInfo/mySchedule': RouteRecordInfo<'/personalCenter/userInfo/mySchedule', '/personalCenter/userInfo/mySchedule', Record<never, never>, Record<never, never>>,
    '/personalCenter/userInfo/mySchedule/': RouteRecordInfo<'/personalCenter/userInfo/mySchedule/', '/personalCenter/userInfo/mySchedule', Record<never, never>, Record<never, never>>,
  }
}
