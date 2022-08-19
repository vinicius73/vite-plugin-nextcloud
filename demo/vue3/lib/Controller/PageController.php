<?php

declare(strict_types=1);

namespace OCA\TimerApp\Controller;

use OC\Security\CSP\ContentSecurityPolicyNonceManager;
use OCA\TimerApp\Manifest\Vite;
use OCP\App\IAppManager;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\IRequest;
use OCA\TimerApp\AppInfo\Application;

class PageController extends Controller {
	private IAppManager $appManager;
	private ContentSecurityPolicyNonceManager $nonceManager;

	public function __construct(string      $appName,
								IRequest    $request,
								IAppManager $appManager,
								ContentSecurityPolicyNonceManager $nonceManager) {
		parent::__construct($appName, $request);

		$this->appManager = $appManager;
		$this->nonceManager = $nonceManager;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function index(): TemplateResponse {
		$nonce = $this->nonceManager->getNonce();
		$base = $this->appManager->getAppWebPath(Application::APP_ID);
		$manifest = Vite::manifest("src/main.ts");

		return new TemplateResponse(Application::APP_ID, "main", compact('manifest', 'nonce', 'base'));
	}
}
