﻿namespace CRUD.Models
{
    public class Movie
    {
        public long Id { get; set; }
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        public string? Genero { get; set; }
        public string? Estudio { get; set; }
        public int? Precio { get; set; }
    }
}
