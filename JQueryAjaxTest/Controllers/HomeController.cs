using JQueryAjaxTest.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace JQueryAjaxTest.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
