﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Project;

namespace ProjectC.Migrations
{
    [DbContext(typeof(ProjectCContext))]
    [Migration("20201220184442_FriendsUpdate")]
    partial class FriendsUpdate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Project.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("Project.Models.FriendRequest", b =>
                {
                    b.Property<int>("Friend1Id")
                        .HasColumnType("integer");

                    b.Property<int>("Friend2Id")
                        .HasColumnType("integer");

                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<bool>("IsConfirmed")
                        .HasColumnType("boolean");

                    b.HasKey("Friend1Id", "Friend2Id");

                    b.HasIndex("Friend2Id");

                    b.ToTable("FriendRequests");
                });

            modelBuilder.Entity("Project.Plant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("AmountOfWater")
                        .HasColumnType("text");

                    b.Property<bool>("Available")
                        .HasColumnType("boolean");

                    b.Property<string>("Category")
                        .HasColumnType("text");

                    b.Property<string>("Color")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("GrowthHeigth")
                        .HasColumnType("text");

                    b.Property<byte[]>("Image")
                        .HasColumnType("bytea");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Perennial")
                        .HasColumnType("text");

                    b.Property<DateTime>("SeasonFrom")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("SeasonTo")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Shadow")
                        .HasColumnType("text");

                    b.Property<string>("Soil")
                        .HasColumnType("text");

                    b.Property<string>("SpecialFeatures")
                        .HasColumnType("text");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Plants");
                });

            modelBuilder.Entity("Project.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<bool>("Active")
                        .HasColumnType("boolean");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("PostalCode")
                        .HasColumnType("text");

                    b.Property<byte[]>("ProfilePicture")
                        .HasColumnType("bytea");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Project.Models.FriendRequest", b =>
                {
                    b.HasOne("Project.User", "Friend1")
                        .WithMany("MyFriends")
                        .HasForeignKey("Friend1Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Project.User", "Friend2")
                        .WithMany("FriendsOf")
                        .HasForeignKey("Friend2Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Friend1");

                    b.Navigation("Friend2");
                });

            modelBuilder.Entity("Project.Plant", b =>
                {
                    b.HasOne("Project.User", "User")
                        .WithMany("Plants")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("User");
                });

            modelBuilder.Entity("Project.User", b =>
                {
                    b.Navigation("FriendsOf");

                    b.Navigation("MyFriends");

                    b.Navigation("Plants");
                });
#pragma warning restore 612, 618
        }
    }
}
