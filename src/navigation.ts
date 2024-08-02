import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";
import { locales } from "./i18n";

export const localePrefix = "always"; // Default

export const pathnames = {
  "/": "/",
  "/contact": "/contact",
  "/all-product": "/all-product",
  "/login": "/login",
} as any;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames })