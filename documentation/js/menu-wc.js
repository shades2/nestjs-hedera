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
                                <a href="modules/AccountsModule.html" data-type="entity-link" >AccountsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AccountsModule-ea762e261849b9f86514fe3b63493cd36e9c98d599da4b32b3b9cb17f350d688271b87c425aa52b63b5e548e0a91bb80c36c7fec84c9a3adc95c9dd78962e4f4"' : 'data-target="#xs-injectables-links-module-AccountsModule-ea762e261849b9f86514fe3b63493cd36e9c98d599da4b32b3b9cb17f350d688271b87c425aa52b63b5e548e0a91bb80c36c7fec84c9a3adc95c9dd78962e4f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccountsModule-ea762e261849b9f86514fe3b63493cd36e9c98d599da4b32b3b9cb17f350d688271b87c425aa52b63b5e548e0a91bb80c36c7fec84c9a3adc95c9dd78962e4f4"' :
                                        'id="xs-injectables-links-module-AccountsModule-ea762e261849b9f86514fe3b63493cd36e9c98d599da4b32b3b9cb17f350d688271b87c425aa52b63b5e548e0a91bb80c36c7fec84c9a3adc95c9dd78962e4f4"' }>
                                        <li class="link">
                                            <a href="injectables/AccountsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
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
                                <a href="modules/HfsModule.html" data-type="entity-link" >HfsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HfsModule-ee8bb38d05fa50513d06b4089d448ff24b940778d54237b85282bcb8426fcc318653e55447146dbad1c37dd58c08cc8715dafb265061d3ad16bbb01aff936088"' : 'data-target="#xs-injectables-links-module-HfsModule-ee8bb38d05fa50513d06b4089d448ff24b940778d54237b85282bcb8426fcc318653e55447146dbad1c37dd58c08cc8715dafb265061d3ad16bbb01aff936088"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HfsModule-ee8bb38d05fa50513d06b4089d448ff24b940778d54237b85282bcb8426fcc318653e55447146dbad1c37dd58c08cc8715dafb265061d3ad16bbb01aff936088"' :
                                        'id="xs-injectables-links-module-HfsModule-ee8bb38d05fa50513d06b4089d448ff24b940778d54237b85282bcb8426fcc318653e55447146dbad1c37dd58c08cc8715dafb265061d3ad16bbb01aff936088"' }>
                                        <li class="link">
                                            <a href="injectables/HfsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HfsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HtsModule.html" data-type="entity-link" >HtsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HtsModule-051886ffdb3e4b3e34a78e3aa211a101f7f0a8deaa073e97b48a8209953533687089aaa5fe517a0ff0ac20560063d0413b55d1a74f6bc0b556829f6eb34c9add"' : 'data-target="#xs-injectables-links-module-HtsModule-051886ffdb3e4b3e34a78e3aa211a101f7f0a8deaa073e97b48a8209953533687089aaa5fe517a0ff0ac20560063d0413b55d1a74f6bc0b556829f6eb34c9add"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HtsModule-051886ffdb3e4b3e34a78e3aa211a101f7f0a8deaa073e97b48a8209953533687089aaa5fe517a0ff0ac20560063d0413b55d1a74f6bc0b556829f6eb34c9add"' :
                                        'id="xs-injectables-links-module-HtsModule-051886ffdb3e4b3e34a78e3aa211a101f7f0a8deaa073e97b48a8209953533687089aaa5fe517a0ff0ac20560063d0413b55d1a74f6bc0b556829f6eb34c9add"' }>
                                        <li class="link">
                                            <a href="injectables/HtsRestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HtsRestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HtsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HtsService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TransactionsModule-e4ba3e6142bfc1bd942f233d0c367f6b031e6499de7745190da9f34490df6d5fde4025b4a49dfa35d06895cd7e4c9815cb3f50a02cba97453f5541bde8a340bd"' : 'data-target="#xs-injectables-links-module-TransactionsModule-e4ba3e6142bfc1bd942f233d0c367f6b031e6499de7745190da9f34490df6d5fde4025b4a49dfa35d06895cd7e4c9815cb3f50a02cba97453f5541bde8a340bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionsModule-e4ba3e6142bfc1bd942f233d0c367f6b031e6499de7745190da9f34490df6d5fde4025b4a49dfa35d06895cd7e4c9815cb3f50a02cba97453f5541bde8a340bd"' :
                                        'id="xs-injectables-links-module-TransactionsModule-e4ba3e6142bfc1bd942f233d0c367f6b031e6499de7745190da9f34490df6d5fde4025b4a49dfa35d06895cd7e4c9815cb3f50a02cba97453f5541bde8a340bd"' }>
                                        <li class="link">
                                            <a href="injectables/TransactionsRestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsRestService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransactionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionsService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                <a href="interfaces/AccountBalance.html" data-type="entity-link" >AccountBalance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HederaOptions.html" data-type="entity-link" >HederaOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MirrorNode.html" data-type="entity-link" >MirrorNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Operator.html" data-type="entity-link" >Operator</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrivateKeyList.html" data-type="entity-link" >PrivateKeyList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenBalance.html" data-type="entity-link" >TokenBalance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransactionDetails.html" data-type="entity-link" >TransactionDetails</a>
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