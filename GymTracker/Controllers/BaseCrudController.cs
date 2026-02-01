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

        [HttpGet]
        public virtual IActionResult Get()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("{id}")]
        public virtual IActionResult GetById(int id)
        {
            var result = _service.GetById(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public virtual IActionResult Post([FromBody] TCreateRequest request)
        {
            var result = _service.Create(request);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public virtual IActionResult Put(int id, [FromBody] TCreateRequest request)
        {
            var result = _service.Update(id, request);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public virtual IActionResult Delete(int id)
        {
            _service.Delete(id);
            return NoContent();
        }

        //helpers
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