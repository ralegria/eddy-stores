import { isEmpty } from "lodash";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import { GENERAL_SETTINGS, NAVIGATION_SETTINGS } from "../graphql/SiteQueries";

import routes from "../routes/routes";

const useSettings = () => {
  const [navSettings, setNavSettings] = useState({});
  const [general_setting, setGeneralSettings] = useState({});

  const { loading: isSettingsLoading } = useQuery(GENERAL_SETTINGS, {
    onCompleted: (data) => {
      setGeneralSettings(data.generalSetting);
    },
  });
  const { loading: isNavLoading } = useQuery(NAVIGATION_SETTINGS, {
    onCompleted: (queryData) => {
      setNavSettings(queryData.navSetting);
    },
  });

  const storedTopBanners = useSelector((state) => state.layout.topBanners);

  const topBannerData = navSettings.top_banners;
  const initialNavMenu = useMemo(
    () =>
      navSettings?.showHomeInMenu
        ? [
            {
              key: "home-item",
              label: <Link to={routes.home}>Home</Link>,
            },
          ]
        : [],
    [navSettings]
  );

  const menuItems = useMemo(
    () => {
      const processItem = (item) => {
        const label = item.label;
        const hasChildren = !isEmpty(item.submenu_items);
        console.log(item.name, item);

        const url = !hasChildren ? item.url : null;

        const getCategoryRelated = (itemName) => {
          const element = navSettings?.menu_categories_relation?.find(
            (category) => category.name === itemName
          );

          return !isEmpty(element)
            ? `${element?.category?.title}-${element?.category?.documentId}`.toLowerCase()
            : null;
        };

        const getUrl = () => {
          if (url && !hasChildren) return url;
          return getCategoryRelated(item.name);
        };

        return {
          key: `${label}-${item.id}`,
          label: <>{getUrl() ? <Link to={getUrl()}>{label}</Link> : label}</>,
          ...(hasChildren && {
            children: item.submenu_items.map(processItem),
          }),
        };
      };

      const processMenuItems = (items) =>
        items.reduce(
          (menu, item) => [...menu, processItem(item)],
          [...initialNavMenu]
        );

      return processMenuItems(navSettings.menu || []);
    },
    [navSettings, initialNavMenu] // Dependency array
  );

  return {
    general_setting,
    isSettingsLoading,
    navSettings,
    menuItems,
    isNavLoading,
    topBanners: storedTopBanners,
    topBannerData,
  };
};

export default useSettings;
