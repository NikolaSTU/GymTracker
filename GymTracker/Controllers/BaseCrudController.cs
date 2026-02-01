using Common.Entities;
using Common.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace GymTracker.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseCrudController<TEntity, TService, TCreateRequest, TResponse> : ControllerBase
        where TEntity : Common.Entities.BaseEntity
        where TService : BaseService<TEntity, TCreateRequest, TResponse>
    {
        protected readonly TService _service;

        public BaseCrudController(TService service)
        {
            _service = service;
        }

        protected bool IsAuthorized(int id)
        {
            int? ownerId = _service.GetOwnerId(id);

            if (ownerId == null) return true;

            return IsOwnerOrAdmin(ownerId.Value);
        }


        [HttpGet]
        public virtual IActionResult Get()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("{id}")]
        public virtual IActionResult GetById(int id)
        {
            if (!IsAuthorized(id))
                return Unauthorized("You do not have permission to view this data.");

            var result = _service.GetById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public virtual IActionResult Post([FromBody] TCreateRequest request)
        {
            //implement security checks later
            var result = _service.Create(request);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public virtual IActionResult Put(int id, [FromBody] TCreateRequest request)
        {
            if (!IsAuthorized(id))
                return Unauthorized("You do not have permission to edit this data.");

            var result = _service.Update(id, request);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public virtual IActionResult Delete(int id)
        {
            if (!IsAuthorized(id))
                return Unauthorized("You do not have permission to delete this data.");

            _service.Delete(id);
            return NoContent();
        }

        protected bool IsOwnerOrAdmin(int resourceOwnerId)
        {
            if (User.IsInRole("Admin")) return true;

            if (resourceOwnerId == GetLoggedUserId()) return true;

            return false;
        }

        protected int GetLoggedUserId()
        {
            var claim = User.FindFirst("loggedUserId");
            if (claim == null) throw new UnauthorizedAccessException("User ID not found in token.");
            return int.Parse(claim.Value);
        }
    }
}