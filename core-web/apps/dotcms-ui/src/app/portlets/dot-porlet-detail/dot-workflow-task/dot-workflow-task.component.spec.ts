/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfirmationService } from 'primeng/api';

import { DotGlobalMessageService } from '@components/_common/dot-global-message/dot-global-message.service';
import { DotIframeService } from '@components/_common/iframe/service/dot-iframe/dot-iframe.service';
import { DotContentletEditorService } from '@components/dot-contentlet-editor/services/dot-contentlet-editor.service';
import { DotWorkflowTaskDetailModule } from '@components/dot-workflow-task-detail/dot-workflow-task-detail.module';
import { DotWorkflowTaskDetailService } from '@components/dot-workflow-task-detail/services/dot-workflow-task-detail.service';
import { DotCustomEventHandlerService } from '@dotcms/app/api/services/dot-custom-event-handler/dot-custom-event-handler.service';
import { DotDownloadBundleDialogService } from '@dotcms/app/api/services/dot-download-bundle-dialog/dot-download-bundle-dialog.service';
import { DotUiColorsService } from '@dotcms/app/api/services/dot-ui-colors/dot-ui-colors.service';
import { DotWizardService } from '@dotcms/app/api/services/dot-wizard/dot-wizard.service';
import { DotWorkflowEventHandlerService } from '@dotcms/app/api/services/dot-workflow-event-handler/dot-workflow-event-handler.service';
import { PushPublishService } from '@dotcms/app/api/services/push-publish/push-publish.service';
import { dotEventSocketURLFactory, MockDotUiColorsService } from '@dotcms/app/test/dot-test-bed';
import {
    DotAlertConfirmService,
    DotCurrentUserService,
    DotEventsService,
    DotGenerateSecurePasswordService,
    DotHttpErrorManagerService,
    DotLicenseService,
    DotMessageDisplayService,
    DotMessageService,
    DotRouterService,
    DotWorkflowActionsFireService
} from '@dotcms/data-access';
import {
    ApiRoot,
    CoreWebService,
    DotcmsConfigService,
    DotcmsEventsService,
    DotEventsSocket,
    DotEventsSocketURL,
    LoggerService,
    LoginService,
    StringUtils,
    UserModel
} from '@dotcms/dotcms-js';
import { DotFormatDateService } from '@dotcms/ui';
import {
    CoreWebServiceMock,
    LoginServiceMock,
    MockDotMessageService,
    MockDotRouterService
} from '@dotcms/utils-testing';

import { DotWorkflowTaskComponent } from './dot-workflow-task.component';

@Injectable()
class MockDotWorkflowTaskDetailService {
    view = jasmine.createSpy('view');
}

const messageServiceMock = new MockDotMessageService({
    'workflow.task.dialog.header': 'Task Detail'
});

describe('DotWorkflowTaskComponent', () => {
    let fixture: ComponentFixture<DotWorkflowTaskComponent>;
    let de: DebugElement;
    let component: DotWorkflowTaskComponent;
    let dotRouterService: DotRouterService;
    let dotIframeService: DotIframeService;
    let dotWorkflowTaskDetailService: DotWorkflowTaskDetailService;
    let dotCustomEventHandlerService: DotCustomEventHandlerService;
    let taskDetail: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DotWorkflowTaskComponent],
            imports: [
                DotWorkflowTaskDetailModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                DotWorkflowTaskDetailService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            params: {
                                asset: '74cabf7a-0e9d-48b6-ab1c-8f76d0ad31e0'
                            }
                        }
                    }
                },
                {
                    provide: DotWorkflowTaskDetailService,
                    useClass: MockDotWorkflowTaskDetailService
                },
                {
                    provide: DotMessageService,
                    useValue: messageServiceMock
                },
                {
                    provide: LoginService,
                    useClass: LoginServiceMock
                },
                DotCustomEventHandlerService,
                DotLicenseService,
                { provide: DotRouterService, useClass: MockDotRouterService },
                DotIframeService,
                DotContentletEditorService,
                { provide: DotUiColorsService, useClass: MockDotUiColorsService },
                DotDownloadBundleDialogService,
                DotWorkflowEventHandlerService,
                PushPublishService,
                ApiRoot,
                UserModel,
                LoggerService,
                StringUtils,
                { provide: CoreWebService, useClass: CoreWebServiceMock },
                DotCurrentUserService,
                DotMessageDisplayService,
                DotcmsEventsService,
                DotEventsSocket,
                { provide: DotEventsSocketURL, useFactory: dotEventSocketURLFactory },
                DotcmsConfigService,
                DotWizardService,
                DotHttpErrorManagerService,
                DotAlertConfirmService,
                ConfirmationService,
                DotFormatDateService,
                DotWorkflowActionsFireService,
                DotGlobalMessageService,
                DotGenerateSecurePasswordService,
                DotEventsService
            ]
        });

        fixture = TestBed.createComponent(DotWorkflowTaskComponent);
        de = fixture.debugElement;
        component = de.componentInstance;
        dotWorkflowTaskDetailService = TestBed.get(DotWorkflowTaskDetailService);
        dotRouterService = TestBed.get(DotRouterService);
        dotIframeService = TestBed.get(DotIframeService);
        dotCustomEventHandlerService = TestBed.get(DotCustomEventHandlerService);
        spyOn(dotIframeService, 'reloadData');
        fixture.detectChanges();
        taskDetail = de.query(By.css('dot-workflow-task-detail'));
    });

    it('should call workflow task modal', () => {
        const params = {
            header: 'Task Detail',
            id: '74cabf7a-0e9d-48b6-ab1c-8f76d0ad31e0'
        };

        expect(dotWorkflowTaskDetailService.view).toHaveBeenCalledWith(params);
    });

    it('should redirect to /workflow and refresh data when modal closed', () => {
        taskDetail.triggerEventHandler('shutdown', {});
        expect(dotRouterService.gotoPortlet).toHaveBeenCalledWith('/c/workflow');
        expect(dotIframeService.reloadData).toHaveBeenCalledWith('workflow');
    });

    it('should redirect to /workflow when edit-task-executed-workflow event is triggered', () => {
        spyOn(component, 'onCloseWorkflowTaskEditor');
        taskDetail.triggerEventHandler('custom', {
            detail: {
                name: 'edit-task-executed-workflow'
            }
        });
        expect(component.onCloseWorkflowTaskEditor).toHaveBeenCalledTimes(1);
    });

    it('should redirect to /workflow when close event is triggered', () => {
        taskDetail.triggerEventHandler('custom', {
            detail: {
                name: 'close'
            }
        });
        expect(dotRouterService.gotoPortlet).toHaveBeenCalledWith('/c/workflow');
        expect(dotIframeService.reloadData).toHaveBeenCalledWith('workflow');
    });

    it('should call to dotCustomEventHandlerService with the correct callbaack', () => {
        spyOn(dotCustomEventHandlerService, 'handle');
        const mockEvent = {
            detail: {
                name: 'workflow-wizard',
                data: {
                    callback: 'fileActionCallbackFromAngular'
                }
            }
        };

        taskDetail.triggerEventHandler('custom', {
            detail: {
                name: 'workflow-wizard',
                data: {
                    callback: 'test'
                }
            }
        });
        expect<any>(dotCustomEventHandlerService.handle).toHaveBeenCalledWith(mockEvent);
    });
});
