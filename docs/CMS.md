# CMS

All content used in this site is contained within the repository.

The `data` folder contains all the CMS information, information for a specific webpage can be found in the `pages` subfolder. Note that this folder setup matches that of Next.js's `pages` root folder.

The `admin.tsx` route is the current exception: this needs refactoring into the `app` folder directory following the Next.js version 13 update (note that this is currently not supported on Static Export sites, so the admin view refactor will likely have to wait for version 14 or 15 of Next.js).
