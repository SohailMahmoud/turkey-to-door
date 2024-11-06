using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuggyController : ControllerBase
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound() {
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest() {
            return BadRequest(new ProblemDetails{Title = "Bad Request"});
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorisedError() {
            return Unauthorized();
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError() {
            ModelState.AddModelError("Error-1", "This is the a validation error number 1");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError() {
            throw new Exception("Server Error");
        }
    }
}