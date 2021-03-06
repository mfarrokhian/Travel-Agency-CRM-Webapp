import { Injectable,
        Inject,
        ComponentFactoryResolver,
        Injector,
        ApplicationRef,
        ComponentRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { DomPortalHost, ComponentPortal, ComponentType } from '@angular/material';
import { IMenuTab, IMenuSubTab } from '../../../Interfaces';

@Injectable()
export class SelectedTabService {
    private _domPortalHost: DomPortalHost;
    listOfTabs: Array<IMenuTab> = [
        {
            header: 'General Site Settings',
            _name: 'contacts',
            ico: 'settings_applications',
            children: [
                {
                    tabName: 'Site Contacts Info',
                    _name: 'contacts',
                    ico: 'receipt',
                    isActive: false
                }
            ]
        },
        {
            header: 'Landing Page Settings',
            _name: 'landing',
            ico: 'developer_board',
            children: [
                {
                    tabName: 'Our Key People (S6)',
                    _name: 'key_people',
                    ico: 'supervisor_account',
                    isActive: false
                },
                {
                    tabName: 'Slider Promo Section (S8)',
                    _name: 'slider',
                    ico: 'perm_media',
                    isActive: false
                },
                {
                    tabName: 'Customers Reviews(S9)',
                    _name: 'reviews',
                    ico: 'thumbs_up_down',
                    isActive: false
                },
                {
                    tabName: 'Our Sponsores(S12)',
                    _name: 'sponsores',
                    ico: 'trending_up',
                    isActive: false
                },
                {
                    tabName: 'Offers Section (S14)',
                    _name: 'offers',
                    ico: 'stars',
                    isActive: false
                }
            ]
        },
        {
            header: 'Administrators Managment',
            _name: 'admin managment system',
            ico: 'face',
            children: []
        },
        {
            header: 'File Storage Manager',
            _name: 'file uploads',
            ico: 'note_add',
            children: [
                {
                    tabName: 'File Storage',
                    _name: 'file uploads',
                    ico: 'note_add',
                    isActive: false
                }
            ]
        }
    ];
    currentlySelectedTab: IMenuTab;
    currentlySelectedChild: IMenuSubTab;
    isChangesSaved = true;

    constructor(
        @Inject(DOCUMENT) private _document: any,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _appRef: ApplicationRef,
        private _injector: Injector
    ) {
        this._domPortalHost = new DomPortalHost(_document.body,
                                                _componentFactoryResolver,
                                                _appRef,
                                                _injector);
    }

    attachViewToDOM<T>(Component: ComponentType<T>): ComponentRef<T> {
        const componentPortal = new ComponentPortal(Component);
        return this._domPortalHost.attachComponentPortal(componentPortal);
    }
}
