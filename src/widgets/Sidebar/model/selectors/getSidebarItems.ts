import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ArticlesIcon from '@/shared/assets/icons/article-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { createSelector } from '@reduxjs/toolkit';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: MainIcon,
                text: 'main'
            },
            {
                path: getRouteAbout(),
                Icon: AboutIcon,
                text: 'about'
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    Icon: ProfileIcon,
                    text: 'profile',
                    authOnly: true
                },
                {
                    path: getRouteArticles(),
                    Icon: ArticlesIcon,
                    text: 'articles',
                    authOnly: true
                }
            );
        }
        return sidebarItemsList;
    },
);