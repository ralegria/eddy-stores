import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { setTopBanners } from "../redux/layoutSlice";
import { GET_CATEGORIES } from "../graphql/CatalogQueries";
import { GENERAL_SETTINGS, NAVIGATION_SETTINGS } from "../graphql/SiteQueries";
import { MENU_TYPES } from "../consts";

const useSettings = () => {
  const dispatch = useDispatch();
  const [navSettings, setNavSettings] = useState({});
  const [categories, setCategories] = useState([]);
  const [general_setting, setGeneralSettings] = useState({});

  const { loading: isSettingsLoading } = useQuery(GENERAL_SETTINGS, {
    onCompleted: (data) => {
      setGeneralSettings(data.generalSetting);
    },
  });
  const { loading: isNavLoading } = useQuery(NAVIGATION_SETTINGS, {
    onCompleted: (queryData) => {
      setNavSettings(queryData.navigationSetting);
    },
  });

  const { loading: isLoadingCategories } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      setCategories(data.categories);
    },
  });

  const storedTopBanners = useSelector((state) => state.layout.topBanners);

  const topBannerData = useMemo(
    () => navSettings.top_banners ?? [],
    [navSettings]
  );

  useEffect(() => {
    if (!isEmpty(topBannerData)) {
      dispatch(setTopBanners(topBannerData));
    }
  }, [dispatch, topBannerData]);

  const menuItems = navSettings?.menu?.reduce((menu, item) => {
    const type = item.type ?? MENU_TYPES.CUSTOM;
    const url = type === MENU_TYPES.CUSTOM ? item.link : null;

    return [
      ...menu,
      {
        key: `${item.title}-${item.id}`,
        label: <Link to={url}>{item.title}</Link>,
        ...(type === MENU_TYPES.CATALOG && {
          children: categories.map((category) => ({
            key: `${category.name}-${category.documentId}`,
            label: category.name,
            children: category?.subcategories?.map((subcategory) => ({
              key: `${subcategory.Name}-${subcategory.documentId}`,
              label: subcategory.Name,
            })),
          })),
        }),
      },
    ];
  }, []);

  return {
    general_setting,
    isSettingsLoading,
    navSettings,
    menuItems,
    isNavLoading,
    isLoadingCategories,
    topBanners: storedTopBanners,
  };
};

export default useSettings;
