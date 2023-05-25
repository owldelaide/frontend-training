import { getUserAuthData } from '@/entities/User';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ArticlesIcon from '@/shared/assets/icons/article.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from '../types/sidebar';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => MainIconDeprecated,
                    on: () => MainIcon
                }),
                text: 'main'
            },
            {
                path: getRouteAbout(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => AboutIconDeprecated,
                    on: () => AboutIcon
                }),
                text: 'about'
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        off: () => ProfileIconDeprecated,
                        on: () => ProfileIcon
                    }),
                    text: 'profile',
                    authOnly: true
                },
                {
                    path: getRouteArticles(),
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        off: () => ArticlesIconDeprecated,
                        on: () => ArticlesIcon
                    }),
                    text: 'articles',
                    authOnly: true
                }
            );
        }
        return sidebarItemsList;
    },
);