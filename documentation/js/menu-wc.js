'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">hsuite-nestjs-hedera documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ClientModule.html" data-type="entity-link" >ClientModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HcsModule.html" data-type="entity-link" >HcsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HcsModule-50846150c3b54be6b924680aa142615861f6b5653c053f62a4f1e5b810134b883a54ed1756eb0937ce00045f596e2d01d533d59b20eac67926f9d66b0644a546"' : 'data-target="#xs-injectables-links-module-HcsModule-50846150c3b54be6b924680aa142615861f6b5653c053f62a4f1e5b810134b883a54ed1756eb0937ce00045f596e2d01d533d59b20eac67926f9d66b0644a546"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HcsModule-50846150c3b54be6b924680aa142615861f6b5653c053f62a4f1e5b810134b883a54ed1756eb0937ce00045f596e2d01d533d59b20eac67926f9d66b0644a546"' :
                                        'id="xs-injectables-links-module-HcsModule-50846150c3b54be6b924680aa142615861f6b5653c053f62a4f1e5b810134b883a54ed1756eb0937ce00045f596e2d01d533d59b20eac67926f9d66b0644a546"' }>
                                        <li class="link">
                                            <a href="injectables/HcsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HcsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HederaModule.html" data-type="entity-link" >HederaModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/KeysModule.html" data-type="entity-link" >KeysModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-KeysModule-7a5d64406c3508b3eab17140dd2ebc0a2d3afd71dd661048a685fd2f3ed9ed0690246dc774954d6a73f153bf392d125fba84854903ffb50220bacbec5ccd28e9"' : 'data-target="#xs-injectables-links-module-KeysModule-7a5d64406c3508b3eab17140dd2ebc0a2d3afd71dd661048a685fd2f3ed9ed0690246dc774954d6a73f153bf392d125fba84854903ffb50220bacbec5ccd28e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-KeysModule-7a5d64406c3508b3eab17140dd2ebc0a2d3afd71dd661048a685fd2f3ed9ed0690246dc774954d6a73f153bf392d125fba84854903ffb50220bacbec5ccd28e9"' :
                                        'id="xs-injectables-links-module-KeysModule-7a5d64406c3508b3eab17140dd2ebc0a2d3afd71dd661048a685fd2f3ed9ed0690246dc774954d6a73f153bf392d125fba84854903ffb50220bacbec5ccd28e9"' }>
                                        <li class="link">
                                            <a href="injectables/KeysService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KeysService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RestModule.html" data-type="entity-link" >RestModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionsModule.html" data-type="entity-link" >TransactionsModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ClientService.html" data-type="entity-link" >ClientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HederaService.html" data-type="entity-link" >HederaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestService.html" data-type="entity-link" >RestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionsRestService.html" data-type="entity-link" >TransactionsRestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionsService.html" data-type="entity-link" >TransactionsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/MirrorNode.html" data-type="entity-link" >MirrorNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Operator.html" data-type="entity-link" >Operator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrivateKeyList.html" data-type="entity-link" >PrivateKeyList</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});